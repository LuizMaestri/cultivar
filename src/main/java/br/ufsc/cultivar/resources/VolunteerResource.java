package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.Volunteer;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RequestMapping("/api/volunteer")
@RestController
public class VolunteerResource extends Resource<Volunteer, String> {
}
