package br.ufsc.cultivar.resource.report;

import br.ufsc.cultivar.dto.ReportDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.service.report.ReportService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/report")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportResource {

    ReportService service;

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<ReportDTO> get() throws ServiceException {
        return service.getAll();
    }
}
