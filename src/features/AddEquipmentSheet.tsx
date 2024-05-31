import { FC } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AddEquipmentForm } from '@/components/forms/AddEquipmentForm'

const AddEquipmentSheet: FC = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button>Добавить оборудование</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Новое оборудование</SheetTitle>
          </SheetHeader>
          <AddEquipmentForm />
        </SheetContent>
      </Sheet>
    </>
  )
}

export { AddEquipmentSheet }
