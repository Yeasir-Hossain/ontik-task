"use client"

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HttpResponse } from '@/types';
import { HttpResponseDetailsDialog } from '@/components/HttpResponseDetailsDialog';
import { fetchResponses } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export default function HttpResponseTable() {
  const [selectedResponse, setSelectedResponse] = useState<HttpResponse | null>(null);
  const [responses, setResponses] = useState<HttpResponse[]>([])

  const columns: ColumnDef<HttpResponse>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => new Date(row.original.timestamp).toLocaleString()
    },
    {
      accessorKey: 'responseData.method',
      header: 'Method',
    },
    {
      accessorKey: 'statusCode',
      header: 'Status',
    },
    {
      accessorKey: 'responseTime',
      header: 'Response Time (ms)',
    },
    {
      accessorKey: 'responseData.origin',
      header: 'Origin',
    },
    {
      id: 'actions',
      header: 'Details',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedResponse(row.original)}
        >
          View Details
        </Button>
      )
    }
  ];

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const { data } = await fetchResponses()
        setResponses(data)
      } catch (error) {
        console.error('Failed to fetch responses', error)
      }
    }

    loadResponses()

    const socket = getSocket()
    socket.on('newResponse', (newResponse: HttpResponse) => {
      setResponses(prev => [newResponse, ...prev.slice(0, 9)])
    })

    return () => {
      socket.off('newResponse')
    }
  }, [])


  return (
    <Card className="w-full container my-10">
      <CardHeader>
        <CardTitle>HTTP Monitor Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={responses} />

        <HttpResponseDetailsDialog
          response={selectedResponse}
          onClose={() => setSelectedResponse(null)}
        />
      </CardContent>
    </Card>
  );
}