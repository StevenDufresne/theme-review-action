const fs = require('fs-extra');
const setConfiguration = (key, value) => {
	console.log(`Setting output for ${key}.`);
	console.log(`::set-output name=${key}::${value}`);
};

const createLogs = () => {
	try {
		const directories = fs
			.readdirSync('./actions', { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const logPath = './logs';

		if (!fs.existsSync(logPath)) {
			fs.mkdirSync(logPath);
		}

		directories.forEach((folderName) => {
			const errorLogPath = `./logs/${folderName}-errors.txt`;
			const warningLogPath = `./logs/${folderName}-warnings.txt`;

			fs.openSync(errorLogPath, 'w');
			console.log('Created log:', errorLogPath);

			fs.openSync(warningLogPath, 'w');
			console.log('Created log:', warningLogPath);
		});

		return true;
	} catch (e) {
		console.log(e);
	}
	return false;
};

/**
 * Outputs the location for the screenshots in the ui-check
 */
const setUIScreenshotPath = () => {
	setConfiguration(
		'location',
		`${process.env.GITHUB_ACTION_PATH}/actions/ui-check/screenshots`
	);
};

/**
 * Outputs the location for the logs
 */
const setLogPath = () => {
	setConfiguration('logs', `${process.env.GITHUB_ACTION_PATH}/logs`);
};

(() => {
	console.log('Setting configurations');
	setUIScreenshotPath();
	setLogPath();
	createLogs();
})();