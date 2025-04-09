
import { Schema, SchemaElement } from "@/types/schema";

// Mock data based on the diagram
export const schemaData: Schema[] = [
  {
    id: "schema1",
    name: "Login Form",
    color: "#6366F1",
    category: "Authentication",
    description: "Standard user login form with username and password",
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
        },
        label: "Required",
        labelColor: "#EF4444"
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
        },
        label: "Secure",
        labelColor: "#10B981"
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
    color: "#8B5CF6",
    category: "User Management",
    description: "New user registration with name, email and password fields",
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
        },
        label: "Required",
        labelColor: "#EF4444"
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
        },
        label: "Validation",
        labelColor: "#F59E0B"
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
        },
        label: "Secure",
        labelColor: "#10B981"
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
    color: "#10B981",
    category: "Communication",
    description: "Contact form with name, email and message fields",
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
        },
        label: "Required",
        labelColor: "#EF4444"
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
        },
        label: "Required",
        labelColor: "#EF4444"
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
        },
        label: "Optional",
        labelColor: "#6366F1"
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
  },
  {
    id: "schema4",
    name: "Starter Schema",
    color: "#EC4899",
    category: "Template",
    description: "A starter schema with various labeled form elements",
    elements: [
      {
        id: "elem12",
        element_nr: "1",
        html_tag: "h2",
        html_id: "form-title",
        value: "Example Form",
        schema_id: "schema4",
        class: "text-xl font-bold mb-4",
        margin: {
          bottom: "24px"
        },
        label: "Heading",
        labelColor: "#4F46E5"
      },
      {
        id: "elem13",
        element_nr: "2",
        html_tag: "label",
        html_id: "name-label",
        value: "Your Name",
        schema_id: "schema4",
        class: "block text-sm font-medium mb-1",
        margin: {
          bottom: "4px"
        },
        label: "Label",
        labelColor: "#8B5CF6"
      },
      {
        id: "elem14",
        element_nr: "3",
        html_tag: "input",
        html_name: "name",
        html_id: "name-input",
        type: "text",
        schema_id: "schema4",
        class: "form-control",
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        },
        label: "Required",
        labelColor: "#EF4444"
      },
      {
        id: "elem15",
        element_nr: "4",
        html_tag: "label",
        html_id: "email-label",
        value: "Email Address",
        schema_id: "schema4",
        class: "block text-sm font-medium mb-1",
        margin: {
          bottom: "4px"
        },
        label: "Label",
        labelColor: "#8B5CF6"
      },
      {
        id: "elem16",
        element_nr: "5",
        html_tag: "input",
        html_name: "email",
        html_id: "email-input",
        type: "email",
        schema_id: "schema4",
        class: "form-control",
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        },
        label: "Validation",
        labelColor: "#F59E0B"
      },
      {
        id: "elem17",
        element_nr: "6",
        html_tag: "label",
        html_id: "dropdown-label",
        value: "Select Option",
        schema_id: "schema4",
        class: "block text-sm font-medium mb-1",
        margin: {
          bottom: "4px"
        },
        label: "Label",
        labelColor: "#8B5CF6"
      },
      {
        id: "elem18",
        element_nr: "7",
        html_tag: "select",
        html_name: "options",
        html_id: "options-select",
        schema_id: "schema4",
        class: "form-select",
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px"
        },
        margin: {
          bottom: "16px"
        },
        label: "Dropdown",
        labelColor: "#14B8A6"
      },
      {
        id: "elem19",
        element_nr: "8",
        html_tag: "button",
        html_id: "submit-button",
        type: "submit",
        value: "Submit Form",
        schema_id: "schema4",
        class: "btn-primary",
        padding: {
          top: "10px",
          right: "16px",
          bottom: "10px",
          left: "16px"
        },
        label: "Action",
        labelColor: "#10B981"
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
