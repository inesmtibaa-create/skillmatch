package com.skillmatch.skillmatchweb.repositories;
import com.skillmatch.skillmatchweb.models.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
     Optional<Etudiant> findByEmail(String email);
}
