package com.claim.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**Represents a Player.
 * @author Rocco Saracino & Valentina Caldana */

@Entity
public class Player {

	/** Generates a playerID*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@OneToOne
	private Account account;

	/**@ManyToMany association = many Player to many hand*/
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Card> hand;

	/**@OneToOne association = one Player to one Game*/
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Game game;

	/**@OneToMany association = one Player to many hand*/
	@OneToMany(cascade = CascadeType.ALL)
	private List<Card> cardsPhase2;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Card> pointStack;

	/** Default Constructor: Object relational mapper (ORM) is a Framework, which
	 * maps objects in database. In order for the mapper to create an object, it
	 * needs a default constructor */
	protected Player() {
	}

	public Player(Account account, List<Card> hand, Game game, List<Card> cardsPhase2,
			List<Card> pointStack) {
		this.account = account;
		this.game = game;
		this.hand = hand;
		this.cardsPhase2 = cardsPhase2;
		this.pointStack = pointStack;
	}

	/**@Getter & @Setter */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccountId(Account account) {
		this.account = account;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public List<Card> getHand() {
		return hand;
	}

	public void setHand(List<Card> hand) {
		this.hand = hand;
	}

	public List<Card> getPointStack() {
		return pointStack;
	}

	public void setPointStack(List<Card> pointStack) {
		this.pointStack = pointStack;
	}

	public List<Card> getCardsForPhase2() {
		return cardsPhase2;
	}

	public void setCardsPhase2(List<Card> cardsPhase2) {
		this.cardsPhase2 = cardsPhase2;
	}

}
