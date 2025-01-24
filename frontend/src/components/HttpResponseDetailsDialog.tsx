import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HttpResponse } from '@/types';

const renderJsonContent = (data: any) => {
	return data ? JSON.stringify(data, null, 2) : 'No data';
};

interface HttpResponseDetailsDialogProps {
	response: HttpResponse | null;
	onClose: () => void;
}

export const HttpResponseDetailsDialog: React.FC<HttpResponseDetailsDialogProps> = ({
	response,
	onClose
}) => {
	if (!response) return null;

	return (
		<Dialog open={!!response} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>Response Details</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[600px] w-full pr-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-bold mb-2">Basic Information</h3>
							<p><strong>ID:</strong> {response._id}</p>
							<p><strong>Timestamp:</strong> {new Date(response.timestamp).toLocaleString()}</p>
							<p><strong>Status Code:</strong> {response.statusCode}</p>
							<p><strong>Response Time:</strong> {response.responseTime} ms</p>
						</div>
						<div>
							<h3 className="font-bold mb-2">Request Details</h3>
							<p><strong>Method:</strong> {response.responseData.method}</p>
							<p><strong>Origin:</strong> {response.responseData.origin}</p>
							<p><strong>URL:</strong> {response.responseData.url}</p>
						</div>
					</div>

					<div className="mt-4">
						<h3 className="font-bold mb-2">Request Payload</h3>
						<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
							<code>{renderJsonContent(response.requestPayload)}</code>
						</pre>
					</div>

					<div className="mt-4">
						<h3 className="font-bold mb-2">Response Headers</h3>
						<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
							<code>{renderJsonContent(response.responseData.headers)}</code>
						</pre>
					</div>

					<div className="mt-4">
						<h3 className="font-bold mb-2">Response JSON</h3>
						<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
							<code>{renderJsonContent(response.responseData.json)}</code>
						</pre>
					</div>

					<div className="mt-4">
						<h3 className="font-bold mb-2">Additional Response Data</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<h4 className="font-semibold">Args</h4>
								<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
									<code>{renderJsonContent(response.responseData.args)}</code>
								</pre>
							</div>
							<div>
								<h4 className="font-semibold">Form Data</h4>
								<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
									<code>{renderJsonContent(response.responseData.form)}</code>
								</pre>
							</div>
							<div>
								<h4 className="font-semibold">Files</h4>
								<pre className="bg-gray-100 p-2 rounded overflow-x-auto">
									<code>{renderJsonContent(response.responseData.files)}</code>
								</pre>
							</div>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};