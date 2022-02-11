import { useCallback, useEffect, useRef, useState } from 'react';
import { smartLockBridge } from 'bridge/framework/smartlock.bridge';
import { supportLanguages } from 'constants/languages';
import { SegmentConst } from 'models/segment.enum';
import { SelfSelectService } from 'services/self-select/self-select.service';

export interface LocalInfo {
	Lang: string;
	GEO: string;
	OEM: string;
	OS: string;
	Segment: string;
	Brand: string;
}

export default function useLocalInfo() {
	const [localInfo, setLocalInfo] = useState<LocalInfo>(null as any);
	const [errorInfo, setErrorInfo] = useState<any>(undefined);
	const systemInfo = smartLockBridge.getSystemInfoWrapper();
	const selfSelect = SelfSelectService.getInstance();
	const selfSelectRef = useRef<any>(null);
	const gamingTag = SegmentConst.Gaming;

	const composeLocalInfo = useCallback(async () => {
		try {
			selfSelectRef.current = await selfSelect.getSegment();
			return systemInfo.getMachineInfo().then((result: any) => {
				if (!result) {
					setLocalInfo({
						Lang: 'en',
						GEO: 'us',
						OEM: 'Lenovo',
						OS: 'Windows',
						Segment: selfSelectRef.current || SegmentConst.ConsumerBase,
						Brand: 'Lenovo'
					});
					return;
				}
				let osName = 'Windows';
				if (result.os && result.os.toLowerCase().indexOf('android') > -1) {
					osName = 'Android';
				}
				let lang = 'en';
				if (result.locale) {
					lang = result.locale.toLowerCase();
					if (supportLanguages.indexOf(lang) === -1) {
						lang = 'en';
					}
				}
				setLocalInfo({
					Lang: lang,
					GEO: result.country.toLowerCase() ? result.country.toLowerCase() : 'us',
					OEM: result.manufacturer ? result.manufacturer : 'Lenovo',
					OS: osName,
					Segment: result.isGaming ? gamingTag : selfSelectRef.current,
					Brand: result.brand ? result.brand : 'Lenovo'
				});
			});
		} catch (error: any) {
			setErrorInfo(error);
		}
	}, [gamingTag, selfSelect, systemInfo]);

	useEffect(() => {
		if (!systemInfo) {
			setLocalInfo({
				Lang: 'en',
				GEO: 'us',
				OEM: 'lenovo',
				OS: 'Windows',
				Segment: SegmentConst.ConsumerBase,
				Brand: 'Lenovo'
			});
			setErrorInfo('systemInfo not found');
			throw new Error('Error: systemInfo not found');
		}
		composeLocalInfo();
	}, [systemInfo, composeLocalInfo]);

	return {
		localInfo,
		errorInfo
	};
}
