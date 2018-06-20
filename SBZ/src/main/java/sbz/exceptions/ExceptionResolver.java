package sbz.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;

@ControllerAdvice
public class ExceptionResolver {

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> badRequestException(BadRequestException exception) {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.TEXT_PLAIN);
		return new ResponseEntity<String>(exception.getMessage(), headers, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MultipartException.class)
	public ResponseEntity<?> fileSizeLimitExceededException(MultipartException e) {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.TEXT_PLAIN);
		return new ResponseEntity<String>("Velicina slike prelazi 1mb!", headers, HttpStatus.PAYLOAD_TOO_LARGE);
	}
	
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<?> notFoundException(NotFoundException exception) {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.TEXT_PLAIN);
		return new ResponseEntity<String>(exception.getMessage(), headers, HttpStatus.NOT_FOUND);
	}
}
