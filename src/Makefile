# Set the source directory
SRC_FOLDER = $(shell pwd)/

# Create the list of modules (the order is important)
MODULES = $(SRC_FOLDER)InheritanceApi.js \
	  $(SRC_FOLDER)Extend.js \
	  $(SRC_FOLDER)Implement.js \
	  $(SRC_FOLDER)Class.js

# Output folder, name and path for modules
OUTPUT_FOLDER = $(shell pwd)/
OUTPUT_NAME = class
OUTPUT_FILE = $(OUTPUT_FOLDER)$(OUTPUT_NAME)

# Compiler bin and flags
COMPILER_BIN = ~/bin/Utils/google_compiler/compiler.jar
COMPILER_FLAGS = --js=$(MODULES) --js_output_file=$(OUTPUT_FILE)-min.js --language_in ECMASCRIPT5_STRICT



class-min.js: InheritanceApi.js Extend.js Implement.js Class.js
	make build

.PHONY: build clean all

build:
	java -jar $(COMPILER_BIN) $(COMPILER_FLAGS)
clean:
	rm $(OUTPUT_NAME)-min.js
all: 
	make clean build

