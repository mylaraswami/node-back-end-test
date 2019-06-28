#include <nan.h>
#include <iostream>
#include <functional> //for std::hash
#include <string>
#include <sstream>  // for string streams 
#include "sha256.h"

using namespace std; 




void encryptFact(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  if (info.Length() < 1) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  if (!info[0]->IsNumber()) {
    Nan::ThrowTypeError("Wrong arguments");
    return;
  }
  double arg0 = info[0]->NumberValue();
  double fact = 1;

  for(int i = 1; i <=arg0; ++i)
  {
      fact *= i;
  }
   ostringstream str1; 
   str1 << fact; 
   string fact_s = str1.str(); 
   std::string str = fact_s;
   std::hash<std::string> hasher;
   double hashed = hasher(str);


  // string input = "grape";
  // string output1 = sha256(input);
  // std::hash<std::string> hasher;
  // double hashed = hasher(output1);

 

   // Number> num = Nan::New(hashed);


    info.GetReturnValue().Set(hashed);

}

void Init(v8::Local<v8::Object> exports) {

  exports->Set(Nan::New("encryptFact").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(encryptFact)->GetFunction());
	
}

NODE_MODULE(factorial, Init)