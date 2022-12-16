export default function getBase64(file, cb, removeDataType = false) {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		if (removeDataType === true) {
			cb(reader.result.split(',')[1]);
		} else {
			cb(reader.result);
		}
	};
	reader.onerror = function (error) {
		console.log('Error: ', error);
	};
}