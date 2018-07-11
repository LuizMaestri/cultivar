package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.Address;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RequestMapping("/api/address")
@RestController
public class AddressResource extends Resource<Address, Long> {

}
