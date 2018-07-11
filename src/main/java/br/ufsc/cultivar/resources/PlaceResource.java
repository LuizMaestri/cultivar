package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.Place;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RequestMapping("/api/place")
@RestController
public class PlaceResource extends Resource<Place, String> {
}
