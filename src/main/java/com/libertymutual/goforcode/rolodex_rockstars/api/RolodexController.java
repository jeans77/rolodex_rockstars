package com.libertymutual.goforcode.rolodex_rockstars.api;

import java.util.List; 

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libertymutual.goforcode.rolodex_rockstars.models.Address;
import com.libertymutual.goforcode.rolodex_rockstars.models.Card;
import com.libertymutual.goforcode.rolodex_rockstars.models.PhoneNumber;
import com.libertymutual.goforcode.rolodex_rockstars.repositories.AddressRepository;
import com.libertymutual.goforcode.rolodex_rockstars.repositories.CardRepository;
import com.libertymutual.goforcode.rolodex_rockstars.repositories.PhoneRepository;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "*")

public class RolodexController {
	private CardRepository cardRepo;
	private AddressRepository addressRepo;
	private PhoneRepository phoneRepo; 

	public RolodexController(CardRepository cardRepo, AddressRepository addressRepo, PhoneRepository phoneRepo) {

		this.cardRepo = cardRepo;
		this.addressRepo = addressRepo;
		this.phoneRepo = phoneRepo;

	} 

	// Get all cards
	@GetMapping("")
	public List<Card> getAllCards() {
		return cardRepo.findAll();
	}

	// Get one card
	@GetMapping("{id}")
	public Card getOneCard(@PathVariable long id) {
		return cardRepo.findOne(id); 
	}

	// Create a card
	@PostMapping("")
	public Card create(@RequestBody Card card) {
		card = cardRepo.save(card);
		List<PhoneNumber> phoneNumber = card.getPhoneNumbers();
		List<Address> address = card.getAddresses(); 

		if (card.getPhoneNumbers() != null && card.getPhoneNumbers().get(0).getNumber() != "") {
			System.out.println(card.getPhoneNumbers());
			phoneNumber.get(0).addCardToPhoneNumber(card);
			phoneRepo.save(phoneNumber);
		}

		if (card.getAddresses() != null && card.getAddresses().get(0).getStreet() != "") {
			address.get(0).addCardToAddress(card);
			addressRepo.save(address);
		}

		return card;
	}
 
	// Add Phone number to Card
	@PostMapping("{id}/phone")
	public Card addPhoneNumberToCard(@PathVariable long id, @RequestBody PhoneNumber phoneNumber) {
		Card card = cardRepo.findOne(id);
		phoneNumber.addCardToPhoneNumber(card); 
		phoneRepo.save(phoneNumber);
		return card; 
	}

	// Add address to Card
	@PostMapping("{id}/address")
	public Card addAddressToCard(@PathVariable long id, @RequestBody Address address) {
		Card card = cardRepo.findOne(id);
		address.addCardToAddress(card);
		addressRepo.save(address);
		return card; 
	}

	// update name and title of a card
	@PutMapping("{id}")
	public Card UpdateCard(@RequestBody Card card, @PathVariable long id) {
		card.setId(id);
		return cardRepo.save(card); 

	}

	// delete a card
	@DeleteMapping("{id}")
	public Card deleteCard(@PathVariable long id) {
		Card card = cardRepo.findOne(id);
		addressRepo.delete(card.getAddresses());
		phoneRepo.delete(card.getPhoneNumbers());
		cardRepo.delete(id);
		return card;

	}

	// Delete phone number from card
	@DeleteMapping("{id}/phone/{pho_id}")
	public void deletePhoneFromCard(@PathVariable long id, @PathVariable long pho_id) {
		try {  
			phoneRepo.delete(phoneRepo.findOne(pho_id));
		} catch (org.springframework.dao.EmptyResultDataAccessException erdae) { 
			System.out.println("Cannot delete something that doesn't exist");
		}  
	}

	// Delete address from card
	@DeleteMapping("{id}/address/{add_id}")
	public void deleteAddressFromCard(@PathVariable long id, @PathVariable long add_id) {
		try {
			
			addressRepo.delete(addressRepo.findOne(add_id));
		} catch (org.springframework.dao.EmptyResultDataAccessException erdae) {
			System.out.println("Cannot delete something that doesn't exist");
		}
	}
}
