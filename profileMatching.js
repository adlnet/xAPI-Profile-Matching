// The matching algorithm from the spec

var SUCCESS = true;
var FAILURE = false;
var PARTIAL = null;
var TEMPLATE =['string', 'string'];
var uuid = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

function matches(statements, element){
	// console.log(statements)
    // console.log(element)
	 var next_matches;
	 var next_statements;
	 var next_element;
	 var last_statements;
	 var result;
	 var maybe_matches;
	 var maybe_statements;
	 var cont;

	if(typeof element === 'string' ){	
		// console.log('isInstance');
	    if (statements.length === 0){
            return [PARTIAL, []];
	    }
        if (statements[0] === element){
            return [SUCCESS, statements.slice(1,statements.length)];
        } else {
            return [FAILURE, statements];
        }
    } else if (element.includes('sequence')){
        next_statements = statements;
        for (var i = 0, len = element[1].length; i < len; i++) {
        	next_element = element[1][i];
  			result = matches(next_statements, next_element);
  			next_matches = result[0];  // When the statement array is empty next_matches gets set to null
  			next_statements = result[1];
  			if(next_matches == FAILURE){
  				return [FAILURE, statements];
  			}
  			if(next_matches == PARTIAL){ 
  				return [PARTIAL, []];
  			}  			
		}
		return [SUCCESS, next_statements];
    } else if (element.includes('alternates')){
    	next_statements = statements;
    	next_matches = FAILURE;
    	for (var i = 0, len = element[1].length; i < len; i++) {
    		next_element = element[1][i];
  			result = matches(statements, next_element);
  			maybe_matches = result[0];
  			maybe_statements = result[1];
  			if(maybe_matches == SUCCESS){
  				next_matches = SUCCESS;
  				if(maybe_statements.length < next_statements.length){
                    next_statements = maybe_statements;
  				}
  			}
  			if(maybe_matches == PARTIAL && next_matches == FAILURE){
  				next_matches = PARTIAL;
  			}
		}
		if(next_matches == PARTIAL){
			return [PARTIAL, []];
		}
		return [next_matches, next_statements];
    } else if (element.includes('oneOrMore')){
        next_matches = FAILURE;
        next_statements = statements;
        last_statements = next_statements;
        while (true){
        	result = matches(last_statements, element[1]);
        	cont = result[0];
        	next_statements = result[1];
        	if(cont == SUCCESS){
                next_matches = SUCCESS;
        	}
            else if(next_matches == FAILURE && cont == PARTIAL){
                return [PARTIAL, []];
            }
            else {
                if(cont == PARTIAL && last_statements.length > 0){
                    return [PARTIAL, last_statements];
                }
                return [next_matches, last_statements];
            }
            if(next_statements.length == last_statements.length){
            	return [SUCCESS, next_statements];
            }
            last_statements = next_statements;
        }
    } else if (element.includes('zeroOrMore')){
        last_statements = statements;
        while(true){
        	result = matches(last_statements, element[1]);
        	cont = result[0];
        	statements = result[1];
        	if(cont == FAILURE){
        		return [SUCCESS, last_statements];
        	}
        	if(cont == PARTIAL && statements.length > 0){
        		return [PARTIAL, statements];
        	}
        	if(statements.length == last_statements.length){
            	return [SUCCESS, statements];
            }
            last_statements = statements;
        }
    } else if (element.includes('optional')){
    	if(statements.length == 0){
    		return [SUCCESS,[]];
    	}
    	result = matches(statements, element[1]);
    	next_matches = result[0]; 
    	next_statements = result[1];
    	if(next_matches == SUCCESS || next_matches == PARTIAL){
    		return [next_matches,next_statements];
    	} else {
    		return[SUCCESS, statements];
    	}
    } else {
    	//error
    }   
}