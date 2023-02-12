package com.pds.ing2.frontendpds2;

import org.springframework.context.annotation.Configuration;

import java.net.URISyntaxException;
import java.util.logging.Logger;

@Configuration
public class CustomProperties {


	private String apiUrl;
	private static final Logger logger = Logger.getLogger(CustomProperties.class.getName());

	private String OS = System.getProperty("os.name").toLowerCase();

	CustomProperties() throws URISyntaxException {
		// get path of the executable
		if (isWindows(OS) || isMac(OS))
			apiUrl = "http://localhost:9000";
		else
			apiUrl = "http://172.31.250.13:9000";

		logger.info("apiUrl: " + apiUrl);
	}

	public boolean isWindows(String OS) {
		return (OS.indexOf("win") >= 0);
	}

	public boolean isMac(String OS) {
		return (OS.indexOf("mac") >= 0);
	}

	public boolean isUnix(String OS) {
		return (OS.indexOf("nix") >= 0
				|| OS.indexOf("nux") >= 0
				|| OS.indexOf("aix") > 0);
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}
}
