package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.User;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

@Log
@RequestMapping("/api/user")
@RestController
public class UserResource extends Resource<User, String> { }
