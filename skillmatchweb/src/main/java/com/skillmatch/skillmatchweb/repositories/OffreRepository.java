package com.skillmatch.skillmatchweb.repositories;

import com.skillmatch.skillmatchweb.models.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Long> {
}