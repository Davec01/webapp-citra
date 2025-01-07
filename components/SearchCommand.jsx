"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Paperclip } from 'lucide-react'

export function SearchCommand() {
  return (
    <div className="max-w-2xl w-full mx-auto space-y-4">
      <h1 className="text-4xl font-bold text-center mb-8">¿Qué quieres saber?</h1>
      <Card className="p-2">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Pregunta lo que sea..."
            className="border-0 focus-visible:ring-0 text-lg"
          />
          <div className="flex items-center justify-between border-t pt-2">
            <Tabs defaultValue="enfoque">
              <TabsList className="bg-transparent p-0 h-8">
                <TabsTrigger value="enfoque" className="px-3 h-8">
                  Enfoque
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button className="h-8">Pro</Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary">✨</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Nuestro regalo para ti: tu primer mes de Pro es gratis</h3>
            <p className="text-sm text-muted-foreground">Disponible solo por tiempo limitado</p>
          </div>
          <Button variant="outline" className="ml-auto">
            Obtener Pro
          </Button>
        </div>
      </Card>
    </div>
  )
}
