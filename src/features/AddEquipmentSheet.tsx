import { FC } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

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
        </SheetContent>
      </Sheet>
    </>
  )
}

export { AddEquipmentSheet }
