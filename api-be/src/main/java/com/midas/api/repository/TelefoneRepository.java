package com.midas.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.midas.api.model.Telefone;

@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Long> {
	@Query("SELECT c FROM Telefone c WHERE c.usuario.id = ?1")
	List<Telefone> findAllByUsuario(Long iduser);
}
