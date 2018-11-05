package br.ufsc.cultivar.service.report;

import br.ufsc.cultivar.dto.ReportDTO;
import br.ufsc.cultivar.repository.report.ReportRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportService {
    ReportRepository repository;

    public List<ReportDTO> getAll(){
        return repository.getAll();
    }
}
