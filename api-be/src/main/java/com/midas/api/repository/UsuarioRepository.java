package com.midas.api.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.midas.api.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	// SELECT -------------------------------------------------------------------------------
	@Query("SELECT u FROM Usuario u WHERE u.login = ?1")
	Usuario findUserByLogin(String login);
	
	//@Query("SELECT u FROM Usuario u WHERE u.id = ?1")
	//Usuario findUserById(Long id);
	
	@Query("SELECT u FROM Usuario u WHERE u.nome LIKE %?1%")
	List<Usuario> findUserByBusca(String busca);
	
	@Query(value="INSERT INTO curso_apirest.usuarios_role (usuario_id, role_id) VALUES (2, (SELECT id FROM curso_apirest.role WHERE role = 'ROLE_USER'))", nativeQuery = true)
	String consultaConstraintRole();
	
	@Modifying
	@Query(value="ALTER TABLE curso_apirest.usuarios_role DROP FOREIGN KEY ?1", nativeQuery = true)
	void removerConstraintRole(String constraint);
	
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO curso_apirest.usuarios_role (usuario_id, role_id) VALUES (?1, (SELECT id FROM curso_apirest.role WHERE role = 'ROLE_USER'))")
	void insereAcessoRolePadrao(Long idUser);
	
	
	public default Page<Usuario> findUserByBuscaPage(String busca, Pageable pageable) {
		Usuario usuario = new Usuario();
		usuario.setNome(busca);
		
		//ExampleMatcher exampleMatcher = Example.of(usuario, exampleMatcher);
		
		
		return null;
		
	}
	
	// UPDATE -------------------------------------------------------------------------------
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE usuario SET token = ?1 WHERE login = ?2")
	void atualizaTokenUsuario(String token, String login);
}

