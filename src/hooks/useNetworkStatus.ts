import { useCallback, useEffect, useRef, useState } from 'react';
import { AppNotification } from 'models/app-notification';
import { NetworkStatus } from 'models/network-status.enum';
import { Subscription } from 'rxjs';
import commonService from 'services/common/common.service';

export default function useNetworkStatus() {
	const [isOnline, setIsOnline] = useState<boolean>(false);
	const subscription = useRef<Subscription>({} as any);

	const subscribe = () => {
		subscription.current = commonService.notification.subscribe((notification: AppNotification) => {
			if (notification) {
				switch (notification.type) {
					case NetworkStatus.Online:
						setIsOnline(true);
						break;
					case NetworkStatus.Offline:
						setIsOnline(false);
						break;
				}
			}
		});
	};

	useEffect(() => {
		console.log('subscribe');
		subscribe();
	}, []);

	useEffect(
		() => () => {
			if (!subscription) {
				return;
			}
			subscription.current.unsubscribe();
		},
		[]
	);

	return {
		isOnline,
		setIsOnline
	};
}
