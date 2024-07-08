import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css';

export default function MarkdownField(props: markdownFieldProps) {

    const {values} = useFormikContext<any>();

    return (
        <div className="mb-3 form-markdown">
            <div className="row">
            <div className="col-sm-6 col-md-6">
                <label htmlFor={props.name}>{props.label}</label>
                <div>
                    <Field as="textarea" id={props.name} name={props.name} className="form-textarea" style={{width: '100%'}}/>
                </div>
            </div>

            <div className="col-sm-6 col-md-6">
                <label htmlFor={props.name}>Preview</label>
                <div className="markdown-container">
                    <ReactMarkdown>{values[props.name]}</ReactMarkdown>
                </div>
            </div>
            </div>

            <ErrorMessage name={props.name}>
                { (msg) => <div className="text-danger">{msg}</div> }
            </ErrorMessage>
        </div>
    )
}

interface markdownFieldProps {
    name: string;
    label: string;
}