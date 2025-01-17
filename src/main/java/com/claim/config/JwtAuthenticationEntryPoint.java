package com.claim.config;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 *
 * @author Lorenzo Antelmi
 * This class will extend Spring's AuthenticationEntryPoint class and override its method commence.
 * It rejects every unauthenticated request and send error code 401
 *
 * source: https://www.javainuse.com/spring/boot-jwt
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 7017757214799275630L;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

	}

}
