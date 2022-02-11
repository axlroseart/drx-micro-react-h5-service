import { useEffect,useState } from 'react';

function svgTobase64 (path: string): Promise<{value: string}> {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", path, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve({
					value: 'data:image/svg+xml;base64,' + window.btoa(xhr.responseText)
				});
			}
		};
	});
}

export function useSvgToBase64 (path: string ) {
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		svgTobase64(path).then(res => {
			setValue(res.value);
		});
	}, [path]);

	return value;
}

