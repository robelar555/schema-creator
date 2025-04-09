
import { Schema, SchemaElement } from "@/types/schema";

// Mock data based on the diagram
export const schemaData: Schema[] = [
  {
    id: "schema1",
    name: "Login Form",
    elements: [
      {
        id: "elem1",
        element_nr: "1",
        html_tag: "input",
        html_name: "username",
        html_id: "username-field",
        type: "text",
        value: "",
        schema_id: "schema1",
        class: "form-control",
        maxlength: 50,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem2",
        element_nr: "2",
        html_tag: "input",
        html_name: "password",
        html_id: "password-field",
        type: "password",
        value: "",
        schema_id: "schema1",
        class: "form-control",
        maxlength: 64,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem3",
        element_nr: "3",
        html_tag: "button",
        html_id: "login-button",
        type: "submit",
        value: "Login",
        schema_id: "schema1",
        class: "btn-primary",
        padding: {
          top: "10px",
          right: "16px",
          bottom: "10px",
          left: "16px"
        }
      }
    ]
  },
  {
    id: "schema2",
    name: "Registration Form",
    elements: [
      {
        id: "elem4",
        element_nr: "1",
        html_tag: "input",
        html_name: "fullname",
        html_id: "fullname-field",
        type: "text",
        value: "",
        schema_id: "schema2",
        class: "form-control",
        maxlength: 100,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem5",
        element_nr: "2",
        html_tag: "input",
        html_name: "email",
        html_id: "email-field",
        type: "email",
        value: "",
        schema_id: "schema2",
        class: "form-control",
        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem6",
        element_nr: "3",
        html_tag: "input",
        html_name: "password",
        html_id: "password-field",
        type: "password",
        value: "",
        schema_id: "schema2",
        class: "form-control",
        maxlength: 64,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem7",
        element_nr: "4",
        html_tag: "button",
        html_id: "register-button",
        type: "submit",
        value: "Register",
        schema_id: "schema2",
        class: "btn-primary",
        padding: {
          top: "10px",
          right: "16px",
          bottom: "10px",
          left: "16px"
        }
      }
    ]
  },
  {
    id: "schema3",
    name: "Contact Form",
    elements: [
      {
        id: "elem8",
        element_nr: "1",
        html_tag: "input",
        html_name: "name",
        html_id: "name-field",
        type: "text",
        value: "",
        schema_id: "schema3",
        class: "form-control",
        maxlength: 100,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem9",
        element_nr: "2",
        html_tag: "input",
        html_name: "email",
        html_id: "email-field",
        type: "email",
        value: "",
        schema_id: "schema3",
        class: "form-control",
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem10",
        element_nr: "3",
        html_tag: "textarea",
        html_name: "message",
        html_id: "message-field",
        value: "",
        schema_id: "schema3",
        class: "form-control",
        size: 500,
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        }
      },
      {
        id: "elem11",
        element_nr: "4",
        html_tag: "button",
        html_id: "send-button",
        type: "submit",
        value: "Send Message",
        schema_id: "schema3",
        class: "btn-primary",
        padding: {
          top: "10px",
          right: "16px",
          bottom: "10px",
          left: "16px"
        }
      }
    ]
  }
];

// Function to get all schema names
export function getSchemaNames(): string[] {
  return schemaData.map(schema => schema.name);
}

// Function to get a schema by name
export function getSchemaByName(name: string): Schema | undefined {
  return schemaData.find(schema => schema.name === name);
}

// Function to get schema elements by schema ID
export function getSchemaElements(schemaId: string): SchemaElement[] {
  const schema = schemaData.find(s => s.id === schemaId);
  return schema ? schema.elements : [];
}
