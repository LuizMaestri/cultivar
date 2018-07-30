package br.ufsc.cultivar.security;

//import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.User;
import br.ufsc.cultivar.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
class AuthService {
    UserService userService;

    AuthResponseDTO authenticate(AuthRequestDTO dto) throws AuthException {
//        try {
//            User user = userService.get(dto.getCpf());
            User user = User.builder().password("123456").build();
            if (user.getPassword().equals(dto.getPassword())) {
                return AuthResponseDTO.builder()
                        .user(user)
                        .token("")
                        .build();
            }
//        } catch (ServiceException ignored) {}
        throw new  AuthException("Usuário e/ou senha incorretos.");
    }
}
