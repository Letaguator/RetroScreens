import * as fs from 'fs';
import * as rd from 'readline';

function appParser(inputFile:string){
    var reader = rd.createInterface(fs.createReadStream(inputFile));

    reader.on("line",(l:string) => {
        var tokens = l.split(" ");
        switch(tokens[0]){
            case("S"):
            case("s"):
            if (tokens.length > 2){
                //call service maker with value of tokens[2]
            }
            else{
                //call service maker with no value
            }
            case("R"):
            case("r"):
            //determine the relationship type by looking up token[1] in the relationship map
            if(tokens.length > 2){
                //call appropriate relationship function with value of token[2]
            }
            else{
                //call appropriate realtionship function with no value
            }
            case("IF"):
            case("If"):
            case("if"):
            if(tokens[1] == "S"||tokens[1] == 's'){
                if(tokens[2] != 'S' && tokens[2] != 's' && tokens[2] != 'R' && tokens[2] != 'r'){
                    //call service defined in token[1] with input defined in tokens[2]
                    //if service returns value greater than 0, then execute next relationship
                    if(service1.result > 0){
                        if(tokens[3] == "S" || tokens[3] == 's'){
                            if(tokens.length > 4){
                                //call token[3] service with value token[4]
                            }
                            else{
                                //call token[3]
                            }
                        }
                        else{
                            if(tokens.length > 4){
                                //call token[3] relationship with value token[4]
                            }
                            else{
                                //call token[3] relationship
                            }
                        }
                    }
                }
                else{
                    //call service defined in token[1] without input
                    //if service returns value greater than 0, then execute next relationship
                    if(service1.result > 0){
                        if(tokens[2] == "S" || tokens[2] == 's'){
                            if(tokens.length > 3){
                                //call token[3] service with value token[4]
                            }
                            else{
                                //call token[3]
                            }
                        }
                        else{
                            if(tokens.length > 3){
                                //call token[3] relationship with value token[4]
                            }
                            else{
                                //call token[3] relationship
                            }
                        }
                    }  
                }
            }
            else{
                if(tokens[2] != 'S' && tokens[2] != 's' && tokens[2] != 'R' && tokens[2] != 'r'){
                    //find what relationship token[1] entails and call appropriate realtionship driver
                    //if relationship returns value greater than 0, then execute next relationship
                    if(service1.result > 0){
                        if(tokens[3] == "S" || tokens[3] == 's'){
                            if(tokens.length > 4){
                                //call token[3] service with value token[4]
                            }
                            else{
                                //call token[3]
                            }
                        }
                        else{
                            if(tokens.length > 4){
                                //call token[3] relationship with value token[4]
                            }
                            else{
                                //call token[3] relationship
                            }
                        }
                    }
                }
                else{
                    //call service defined in token[1] without input
                    //if service returns value greater than 0, then execute next relationship
                    if(service1.result > 0){
                        if(tokens[2] == "S" || tokens[2] == 's'){
                            if(tokens.length > 3){
                                //call token[3] service with value token[4]
                            }
                            else{
                                //call token[3]
                            }
                        }
                        else{
                            if(tokens.length > 3){
                                //call token[3] relationship with value token[4]
                            }
                            else{
                                //call token[3] relationship
                            }
                        }
                    }  
                }
            }
        }
    })
}
