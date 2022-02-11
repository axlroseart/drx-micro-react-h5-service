import { useCallback, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import useLocalInfo from 'hooks/useLocalInfo';
import { DeviceFilterService } from 'services/device-filter/device-filter.service';
import { LoggerService } from 'services/logger/logger.service';

import { CMSApiList, DEFAULT_OPTIONS } from '../constants/cmsApi';
import { FeatureContent } from '../models/feature-content';
import { getDateTime, querySerialization } from '../utils/format-tool';

interface CMSReqParams {
	page?: string;
	id?: string;
}

interface RequestParam {
	url: string;
	queryParams: string;
}

interface RequestOptions {
	observableMsg?: string;
}

interface OneContentFilter {
	results: any[];
	template: string | any[];
	position: any;
	dataSource: ContentSource.CMS;
}

enum ContentSource {
	CMS = 'cms',
	UPE = 'upe',
	Local = 'local'
}

const cmsHost = process.env.REACT_APP_CMS_API_ROOT;

const useCMS = (
	type: string,
	params?: CMSReqParams
): {
	loading: boolean;
	cmsData: any;
	oneCMSContentFilter: (T: any) => FeatureContent[];
	filterCMSContent: (T: any[]) => Promise<any>;
} => {
	const logger = new LoggerService();
	const { localInfo } = useLocalInfo();
	const [loading, setLoading] = useState<boolean>(false);
	const [cmsData, setCmsData] = useState(undefined);

	const request = async (reqParams: RequestParam, options?: RequestOptions): Promise<any> => {
		let { url, queryParams } = reqParams;
		const querys = querySerialization(queryParams);
		const observableMsg = options?.observableMsg;
		url = url + querys;
		const opts = Object.assign(DEFAULT_OPTIONS, options);
		return fetch(url, opts)
			.then(async (res) => {
				if (!res.ok) {
					return observableMsg || 'bad request';
				}
				const result = await res.json();
				setCmsData(result);
			})
			.catch((error) => {
				const msg = observableMsg || error;
				throw new Error(msg);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const deviceFilter = async (filters: any) => {
		if (!filters) {
			return true;
		}

		try {
			const deviceFilterService = new DeviceFilterService();
			return await deviceFilterService.deviceFilter(filters);
		} catch (error) {
			return false;
		}
	};

	const filterCMSContent = async (contents: any[]): Promise<any> => {
		const promises: any[] = [];
		contents.forEach((content) => {
			promises.push(deviceFilter(content.Filters));
		});

		return Promise.all(promises).then((deviceFilterValues) => contents.filter((content, index) => deviceFilterValues[index]));
	};

	const sortCmsContent = (a: FeatureContent, b: FeatureContent): number => {
		if (a.Priority && (a.Priority.toUpperCase() === 'P10' || !b.Priority)) {
			return 1;
		}

		if (b.Priority && (b.Priority.toUpperCase() === 'P10' || !a.Priority)) {
			return -1;
		}

		if (a.Priority && b.Priority && a.Priority !== b.Priority) {
			return a.Priority.localeCompare(b.Priority);
		}

		return getDateTime(b.DisplayStartDate) - getDateTime(a.DisplayStartDate);
	};

	const oneCMSContentFilter = (params: OneContentFilter): FeatureContent[] => {
		const { results, template, position, dataSource = ContentSource.CMS } = params;
		return results
			.filter(
				(record) =>
					template.includes(record.Template) &&
					(!position || record.Position === position) &&
					(!record.DisplayStartDate || getDateTime(record.DisplayStartDate) <= new Date().getTime())
			)
			.filter((record) => {
				try {
					record.Title = DOMPurify.sanitize(record.Title, { USE_PROFILES: { html: true } });
					record.Description = DOMPurify.sanitize(record.Description, { USE_PROFILES: { html: true } });
					record.DataSource = dataSource;
				} catch (ex: any) {
					logger.error('CMSService.sanitize error:', ex.message);
					return false;
				}
				return true;
			})
			.sort(sortCmsContent);
	};

	const fetchCMSData = useCallback(async () => {
		setLoading(true);
		const { id } = params as CMSReqParams;
		let defaults;
		let url = cmsHost + CMSApiList.features;
		let observableMsg;
		let cmsOption: any;
		switch (type) {
			case 'content':
				defaults = {
					Lang: localInfo.Lang,
					GEO: localInfo.GEO,
					OEM: localInfo.OEM,
					OS: localInfo.OS,
					Segment: localInfo.Segment,
					Brand: localInfo.Brand
				};
				cmsOption = Object.assign(defaults, params);
				break;
			case 'article':
				cmsOption = Object.assign(
					{
						Lang: localInfo.Lang
					},
					params
				);
				url = `${url}${id}`;
				break;
		}

		const query = {
			url: url,
			queryParams: cmsOption
		};

		return request(query, {
			observableMsg: observableMsg
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localInfo]);

	useEffect(() => {
		fetchCMSData();
	}, [fetchCMSData]);

	return {
		loading,
		cmsData,
		oneCMSContentFilter,
		filterCMSContent
	};
};

export default useCMS;
