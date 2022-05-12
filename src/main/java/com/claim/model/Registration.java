package com.claim.model;

import java.sql.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * @author deborahvanzin
 * Diese Klasse ist ein Datatransfer-Object und für die Registrierung. 
 */

public class Registration {

	@NotBlank(message="Benutzername darf nicht leer sein!")
	private String username;

	@NotBlank(message="E-Mail darf nicht leer sein!")
	@Email(message="Eingabe ist keine Email-Adresse!")
	private String email;

	@NotBlank(message="Passwort darf nicht leer sein!")
	private String password;

	
	private Date birthDate;




	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Date getBirthDate() {
		return birthDate;
	}


	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}



}