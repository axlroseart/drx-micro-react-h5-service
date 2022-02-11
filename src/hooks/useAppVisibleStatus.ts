import { useState } from 'react';

import useEventListener from './useEventListener';

export default function useAppVisibleStatus() {
	const [appVisible, setAppVisible] = useState<boolean>(true);
	const [appFocus, setAppFocus] = useState<boolean>(false);

	const [shellFocus, setShellFocus] = useState<boolean>(false);
	const [webUIFocus, setWebUIFocus] = useState<boolean>(false);

	useEventListener(
		'visibilitychange',
		() => {
			setAppVisible(!document.hidden);
		},
		document
	);

	// invoked by the external shell
	window.shellFocus = () => {
		setShellFocus(true);
		onAppFocus();
	};

	useEventListener('focus', () => {
		setWebUIFocus(true);
		onAppFocus();
	});

	// invoked by the external shell
	window.shellBlur = () => {
		setShellFocus(false);
		onAppBlur();
	};

	useEventListener('blur', () => {
		setWebUIFocus(false);
		onAppBlur();
	});

	const onAppFocus = () => {
		setAppFocus(true);
	};

	const onAppBlur = () => {
		setAppFocus(false);
	};

	return {
		appVisible,
		appFocus
	};
}
