// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "API Support",
            "email": "chulbong.kr@gmail.com"
        },
        "license": {
            "name": "MIT",
            "url": "https://github.com/Alfex4936/chulbong-kr/blob/main/LICENSE"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/login": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint is responsible for authenticating a user in the system.\nIt validates the user's login credentials (email and password).\nIf the credentials are invalid, it returns an error.\nOn successful authentication, it returns the user's information along with a token.\nThe token is also set in a secure cookie for client-side storage.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Log in a user",
                "operationId": "login-user",
                "parameters": [
                    {
                        "description": "Login Request",
                        "name": "loginRequest",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User logged in successfully, includes user info and token",
                        "schema": {
                            "$ref": "#/definitions/dto.LoginResponse"
                        }
                    },
                    "400": {
                        "description": "Cannot parse JSON, wrong login form.",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "401": {
                        "description": "Invalid email or password",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "500": {
                        "description": "Failed to generate token",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/auth/request-reset-password": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint initiates the password reset process for a user.\nIt generates a password reset token and sends a reset password email to the user.\nThe email sending process is executed in a non-blocking manner using a goroutine.\nIf there is an issue generating the token or sending the email, it returns an error.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Request password reset",
                "operationId": "request-reset-password",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User's email address for password reset",
                        "name": "email",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Password reset request initiated successfully"
                    },
                    "500": {
                        "description": "Failed to request reset password",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/auth/reset-password": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint allows a user to reset their password using a valid token.\nThe token is typically obtained from a password reset email.\nIf the token is invalid or the reset fails, it returns an error.\nOn successful password reset, it returns a success status.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Reset password",
                "operationId": "reset-password",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Password reset token",
                        "name": "token",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "New password",
                        "name": "password",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Password reset successfully"
                    },
                    "500": {
                        "description": "Failed to reset password",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/auth/send-verification-email": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint triggers sending a verification email to the user.\nIt checks if the email is already registered in the system.\nIf the email is already in use, it returns an error.\nIf the email is not in use, it asynchronously sends a verification email to the user.\nThe operation of sending the email does not block the API response, making use of a goroutine for asynchronous execution.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Send verification email",
                "operationId": "send-verification-email",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User Email",
                        "name": "email",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Email sending initiated successfully"
                    },
                    "409": {
                        "description": "Email already registered",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "500": {
                        "description": "An unexpected error occurred",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/auth/signup": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint is responsible for registering a new user in the system.\nIt checks the verification status of the user's email before proceeding.\nIf the email is not verified, it returns an error.\nOn successful creation, it returns the user's information.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Sign up a new user [normal]",
                "operationId": "sign-up-user",
                "parameters": [
                    {
                        "description": "SignUp Request",
                        "name": "signUpRequest",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.SignUpRequest"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "User registered successfully",
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    },
                    "400": {
                        "description": "Email not verified",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "409": {
                        "description": "Email already registered",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "500": {
                        "description": "An error occurred while creating the user",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/auth/validate-token": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint is responsible for validating a user's token.\nIt checks the token's validity against the provided email.\nIf the token is invalid or expired, it returns an error.\nOn successful validation, it returns a success status.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Validate token",
                "operationId": "validate-token",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Token for validation",
                        "name": "token",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "User's email associated with the token",
                        "name": "email",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Token validated successfully"
                    },
                    "400": {
                        "description": "Invalid or expired token",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "500": {
                        "description": "Error validating token",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/markers/close": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "This endpoint retrieves markers that are close to a specified location within a given distance.\nIt requires latitude, longitude, distance, and the number of markers (N) to return.\nIf no markers are found within the specified distance, it returns a \"No markers found\" message.\nReturns a list of markers that meet the criteria. (maximum 3km distance allowed)",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "markers"
                ],
                "summary": "Find close markers",
                "operationId": "find-close-markers",
                "parameters": [
                    {
                        "type": "number",
                        "description": "Latitude of the location (float)",
                        "name": "latitude",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "number",
                        "description": "Longitude of the location (float)",
                        "name": "longitude",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Search radius distance (meters)",
                        "name": "distance",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Number of markers to return",
                        "name": "N",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Markers found successfully (with distance)",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/dto.MarkerWithDistance"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid query parameters",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "404": {
                        "description": "No markers found within the specified distance",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "dto.LoginRequest": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "dto.LoginResponse": {
            "type": "object",
            "properties": {
                "token": {
                    "type": "string"
                },
                "user": {
                    "$ref": "#/definitions/models.User"
                }
            }
        },
        "dto.MarkerWithDistance": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "distance": {
                    "description": "Distance in meters",
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "longitude": {
                    "type": "number"
                },
                "markerId": {
                    "type": "integer"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "integer"
                }
            }
        },
        "dto.SignUpRequest": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "description": "Optional, not used for OAuth2 sign-ups",
                    "type": "string"
                },
                "provider": {
                    "description": "e.g., \"google\", \"kakao\", empty for traditional sign-ups",
                    "type": "string"
                },
                "providerId": {
                    "description": "Unique ID from the provider, empty for traditional sign-ups",
                    "type": "string"
                },
                "username": {
                    "description": "Optional for traditional, used if provided for OAuth2",
                    "type": "string"
                }
            }
        },
        "models.User": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "userId": {
                    "description": "TODO: UUID?",
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:9452",
	BasePath:         "/api/v1/",
	Schemes:          []string{},
	Title:            "chulbong-kr API",
	Description:      "Pullup bar locations with KakaoMap API",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
