package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Place;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Log
@RequestMapping("/api/place")
@RestController
public class PlaceResource extends Resource<Place, String> {

    @GetMapping(value= "/school" , produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Place> listSchool() throws ServiceException {
        val map = new HashMap<String, Object>();
        map.put("fl_school", true);
        return service.list(map);
    }

    @GetMapping(value= "/company" , produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Place> listCompany() throws ServiceException {
        val map = new HashMap<String, Object>();
        map.put("fl_school", false);
        return service.list(map);
    }
}
