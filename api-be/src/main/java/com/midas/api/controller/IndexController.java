package com.midas.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.midas.api.model.Telefone;
import com.midas.api.model.Usuario;
import com.midas.api.repository.TelefoneRepository;
import com.midas.api.repository.UsuarioRepository;
import com.midas.api.service.ImplementacaoUserDetailsService;
import com.midas.api.util.CaracterUtil;

@RestController // Arquitetura REST
@RequestMapping(value = "/usuario")
public class IndexController {
	
	@Autowired
	private UsuarioRepository usuarioRp;
	
	@Autowired
	private ImplementacaoUserDetailsService implementacaoUserDetailsService;
	
	@Autowired
	private TelefoneRepository telefoneRp;
	
	
	
	// METODO GET #################################################################################
	
	/* Serviço RESTful */
	@GetMapping(value = "/{id}", produces = "application/json")
	@CachePut("cacheuser")
	public ResponseEntity<Usuario> init(@PathVariable (value = "id") Long id) {
		
		Optional<Usuario> usuario = usuarioRp.findById(id);
		
		return new ResponseEntity<Usuario>(usuario.get(), HttpStatus.OK);
	}
	
	//Consulta todos os users
	@GetMapping(value = "/telefones/id/{id}", produces = "application/json")
	public ResponseEntity<List<Telefone>> telefones(@PathVariable("id") Long id) {
		List<Telefone> list = telefoneRp.findAllByUsuario(id);
		
		return new ResponseEntity<List<Telefone>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/telefone/{pagina}", produces = "application/json")
	public ResponseEntity<Page<Telefone>> telefonePagina(@PathVariable("pagina") int pagina) throws InterruptedException {
		
		Pageable pageable = PageRequest.of(pagina, 5, Sort.by("nome"));
		
		Page<Telefone> list = telefoneRp.findAll(pageable);
			
		
		return new ResponseEntity<Page<Telefone>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/pagina/{pagina}", produces = "application/json")
	@CacheEvict(value = "cacheusuarios", allEntries = true)
	@CachePut("cacheusuarios")
	public ResponseEntity<Page<Usuario>> usuarioPagina(@PathVariable("pagina") int pagina) throws InterruptedException {
		
		Pageable pageable = PageRequest.of(pagina, 5, Sort.by("nome"));
		
		Page<Usuario> list = usuarioRp.findAll(pageable);
			
		
		return new ResponseEntity<Page<Usuario>>(list, HttpStatus.OK);
	}
	
	//Consulta todos os users - busca
	@GetMapping(value = "/usuarioBusca/{busca}", produces = "application/json")
	@CacheEvict(value = "cacheusuarios", allEntries = true)
	@CachePut("cacheusuarios")
	public ResponseEntity<Page<Usuario>> usuarioNome(@PathVariable("busca") String busca) throws InterruptedException {
		
		Page<Usuario> list = null;
		Pageable pageable = null;
		busca = CaracterUtil.buscaContexto(busca);
		if (busca.equals("")) {
			pageable = PageRequest.of(0, 5, Sort.by("nome"));
			list = usuarioRp.findAll(pageable);			
		} else {
			pageable = PageRequest.of(0, 5, Sort.by("nome"));
			list = usuarioRp.findUserByBuscaPage(busca, pageable);
		}
		
	
		return new ResponseEntity<Page<Usuario>>(list, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/usuarioPorNome/{nome}/page/{page}", produces = "application/json")
	@CachePut("cacheusuarios")
	public ResponseEntity<Page<Usuario>> usuarioPorNomePage (@PathVariable("nome") String nome, @PathVariable("page") int page) throws InterruptedException{				
		PageRequest pageRequest = null;
		Page<Usuario> list = null;	
		if (nome == null || (nome != null && nome.trim().isEmpty())
				|| nome.equalsIgnoreCase("undefined")) {	
			pageRequest = PageRequest.of(page, 5, Sort.by("nome"));
			list =  usuarioRp.findAll(pageRequest);
		}							
		return new ResponseEntity<Page<Usuario>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value = "/usuarioPorNome/{nome}", produces = "application/json")
	@CachePut("cacheusuarios")
	public ResponseEntity<Page<Usuario>> usuarioPorNome (@PathVariable("nome") String nome) throws InterruptedException{
		
		
		PageRequest pageRequest = null;
		Page<Usuario> list = null;
		
		if (nome == null || (nome != null && nome.trim().isEmpty())
				|| nome.equalsIgnoreCase("undefined")) {
			
			pageRequest = PageRequest.of(0, 5, Sort.by("nome"));
			list =  usuarioRp.findAll(pageRequest);
		}else {
			pageRequest = PageRequest.of(0, 5, Sort.by("nome"));
			list = usuarioRp.findUserByNamePage(nome, pageRequest);
		}		
				
		
		
		return new ResponseEntity<Page<Usuario>>(list, HttpStatus.OK);
	}
	
	
	// METODO POST ################################################################################
	
	@PostMapping(value = "/", produces = "application/json")
	public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) throws Exception {
		
		// amarrar os telefones ao usuario
		for(int pos = 0; pos < usuario.getListTelefones().size(); pos++) {
			usuario.getListTelefones().get(pos).setUsuario(usuario);
		}
		
	/*	if(usuario.getCep() != null) {
			// consumindo API externa
			URL url = new URL("https://viacep.com.br/ws/" + usuario.getCep() +"/json/");
			URLConnection connection = url.openConnection();
			InputStream is = connection.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
			
			String cep = "";
			StringBuilder jsonCep = new StringBuilder();
			while((cep = br.readLine()) != null) {
				jsonCep.append(cep);
			}
			
			System.out.println(jsonCep.toString());
			
			Usuario userAux = new Gson().fromJson(jsonCep.toString(), Usuario.class);
			
			usuario.setCep(userAux.getCep());
			usuario.setLogradouro(userAux.getLogradouro());
			usuario.setComplemento(userAux.getComplemento());
			usuario.setBairro(userAux.getBairro());
			usuario.setLocalidade(userAux.getLocalidade());
			usuario.setUf(userAux.getUf());
			
			// consumindo API externa - fim		
		}*/
		
		String senhacrypt = new BCryptPasswordEncoder().encode(usuario.getSenha());
		usuario.setSenha(senhacrypt);
		
		Usuario usuariosalvo = usuarioRp.save(usuario);
		
		implementacaoUserDetailsService.insereAcessoPadrao(usuariosalvo.getId());
		
		return new ResponseEntity<Usuario>(usuariosalvo, HttpStatus.OK);
	}
	
	@PostMapping(value = "/telefoneadd/{numero}/iduser/{id}", produces = "application/json")
	public ResponseEntity<Telefone> cadastrartelefone(@PathVariable("numero") String numero, @PathVariable("id") Long id) {
	    Usuario usuario = usuarioRp.findById(id).get();
	    
	    Telefone telefone = new Telefone();
	    telefone.setNumero(numero);
	    telefone.setUsuario(usuario);
	    
	    telefoneRp.save(telefone);

	    return new ResponseEntity<Telefone>(telefone, HttpStatus.OK);
	}

	
	
	// METODO PUT #################################################################################
	
	@PutMapping(value = "/", produces = "application/json")
	public ResponseEntity<Usuario> atualizar(@RequestBody Usuario usuario){
		
		// amarrar os telefones ao usuario
		for(int pos = 0; pos < usuario.getListTelefones().size(); pos++) {
			usuario.getListTelefones().get(pos).setUsuario(usuario);
		}
		
		//Usuario userTemporario = usuarioRp.findUserById(usuario.getId());
		
		//if (!userTemporario.getSenha().equals(usuario.getSenha())) { // Senhas diferentes
		//	String senhacriptografada = new BCryptPasswordEncoder().encode(usuario.getSenha());
		//	usuario.setSenha(senhacriptografada);
		//}
		
		Usuario usuarioatualiza = usuarioRp.save(usuario);
		
		
		return new ResponseEntity<Usuario>(usuarioatualiza, HttpStatus.OK);
	}
	
	// METODO DELETE ##############################################################################
	
	@DeleteMapping(value = "/{id}", produces = "application/json")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		usuarioRp.deleteById(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/deleteTelefone/{id}", produces = "application/json")
	public ResponseEntity<?> deleteTelefone(@PathVariable("id") Long id) {
		telefoneRp.deleteById(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}
}