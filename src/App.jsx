import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	AutoLink,
	Autosave,
	Bold,
	CloudServices,
	Essentials,
	Heading,
	Italic,
	Link,
	List,
	Mention,
	Paragraph,
	SelectAll,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	Undo
} from 'ckeditor5';
import { ExportPdf, MergeFields, Template, SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './App.css';

const LICENSE_KEY = '';

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'insertMergeField',
				'previewMergeFields',
				'|',
				'exportPdf',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'link',
				'insertTable',
				'insertTemplate',
				'|',
				'bulletedList',
				'numberedList'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			AutoLink,
			Autosave,
			Bold,
			CloudServices,
			Essentials,
			ExportPdf,
			Heading,
			Italic,
			Link,
			List,
			Mention,
			MergeFields,
			Paragraph,
			SelectAll,
			Table,
			TableCellProperties,
			TableProperties,
			TableToolbar,
			Template,
			Undo,
			SlashCommand
		],
		exportPdf: {
			stylesheets: [
				'./App.css',
				'https://cdn.ckeditor.com/ckeditor5/43.1.0/ckeditor5.css',
				'https://cdn.ckeditor.com/ckeditor5-premium-features/43.1.0/ckeditor5-premium-features.css'
			],
			fileName: 'export-pdf-demo.pdf',
			converterOptions: {
				format: 'A4',
				margin_top: '20mm',
				margin_bottom: '20mm',
				margin_right: '24mm',
				margin_left: '24mm',
				page_orientation: 'portrait'
			}
		},
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		licenseKey: LICENSE_KEY,
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		mention: {
			feeds: [
				{
					marker: '@',
					feed: [
					]
				}
			]
		},
		mergeFields: {
			definitions: [
				{
					id: 'myName',
					label: 'My Name',
					defaultValue: 'John Doe'
				},
				{
					id: 'invoiceDate',
					label: 'Invoice Date',
					defaultValue: '2024-06-01'
				},
			]		
		},
		placeholder: 'Type or paste your content here!',
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
			defaultHeadings: { rows: 1 }
		},
		template: {
			definitions: [
				{
					title: 'Invoice',
					description: 'Simple and clean invoice',
					data: `<h2>Invoice #1, {{invoiceDate}}</h2>
							<p>
								{{myName}},&nbsp;<br>
								123 Main Street, Anytown USA 12345&nbsp;<br>
								&nbsp;
							</p>
							<h2>
								Bill To:
							</h2>
							<p>
								Acme inc,&nbsp;<br>
								123 Main Street, Anytown USA 12345&nbsp;<br>
								&nbsp;
							</p>
							<h2>
								Performed Work:
							</h2>
							<figure class="table" style="width:100%;">
								<table>
									<thead>
										<tr>
											<th>
												Completed Work
											</th>
											<th>
												Rate
											</th>
											<th>
												Total Amount
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<ul>
													<li>
														Software development
													</li>
													<li>
														Maintaining the React code
													</li>
													<li>
														Feature implementation
													</li>
												</ul>
											</td>
											<td>
												$1000
											</td>
											<td>
												$1000
											</td>
										</tr>
									</tbody>
								</table>
							</figure>
							<p>
								<br>
								&nbsp;
							</p>
							<h2>
								Notes
							</h2>
							<h3>
								Bank Account
							</h3>
							<ul>
								<li>
									Account number: 5570677412
								</li>
								<li>
									Account holder name: {{myName}}
								</li>
							</ul>
							<p>
								Link to the completed project: <a target="_blank" rel="noopener noreferrer" href="https://github.com">Github Repo</a>
							</p>`
				},
			]
		},
		slashCommand: {
			removeCommands: [ 'heading', 'paragraph', 'bulletedList', 'numberedList', 'insertTable' ]
		}		
	};

	return (
		<div>
			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div ref={editorRef}>{isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
