package com.libertymutual.goforcode.rolodex_rockstars.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity

public class Address {
	@Id
	@GeneratedValue(generator = "AddressIdSeq", strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "AddressIdSeq", sequenceName = "AddressIdSeq")
	private Long id;

	@ManyToOne
	private Card card;

	@Column(length = 20)
	private String type;

	@Column(length = 100)
	private String street;

	@Column(length = 100)
	private String city;

	@Column(length = 2)
	private String state;

	@Column(length = 5)
	private int zipCode;

	public void addCardToAddress(Card card) {
		this.card = card; 
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Card getCard() {
		return card;
	}

	public void setCard(Card card) {
		this.card = card;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

}
