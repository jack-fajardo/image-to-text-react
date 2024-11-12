"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Upload, X, Maximize2 } from "lucide-react"

interface UploadedImage {
    id: string
    url: string
    name: string
}

export default function ImageUploader() {
    const [images, setImages] = useState<UploadedImage[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            addImagesToState(Array.from(files))
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        addImagesToState(Array.from(files))
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items
        const imageFiles = Array.from(items)
            .filter(item => item.type.indexOf("image") !== -1)
            .map(item => item.getAsFile())
            .filter((file): file is File => file !== null)
        addImagesToState(imageFiles)
    }

    const addImagesToState = (files: File[]) => {
        const newImages = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            name: file.name
        }))
        setImages(prevImages => [...prevImages, ...newImages])
    }

    const removeImage = (id: string) => {
        setImages(prevImages => prevImages.filter(image => image.id !== id))
    }

    return (
        <div className="my-10">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Image Uploader</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-colors hover:border-muted-foreground/50"
                        onDrop={handleDrop}
                        onDragOver={e => e.preventDefault()}
                        onPaste={handlePaste}
                    >
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">Drag and drop images here, or click to select files</p>
                        <p className="mt-1 text-xs text-muted-foreground/75">You can also paste images from clipboard</p>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple
                            className="hidden"
                            id="image-upload"
                        />
                        <Label htmlFor="image-upload">
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-4"
                            >
                                Select Images
                            </Button>
                        </Label>
                    </div>
                    {images.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Preview</TableHead>
                                    <TableHead>File Name</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {images.map((image) => (
                                    <TableRow key={image.id}>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" className="p-0 h-16 w-16" onClick={() => setSelectedImage(image)}>
                                                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                                            <img src={image.url} alt={image.name} className="absolute inset-0 w-full h-full object-cover" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity">
                                                                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                                                            </div>
                                                        </div>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <img src={image.url} alt={image.name} className="w-full h-auto" />
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell className="font-medium">{image.name}</TableCell>
                                        <TableCell className="m-5">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => removeImage(image.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Convert</span>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeImage(image.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Remove</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}