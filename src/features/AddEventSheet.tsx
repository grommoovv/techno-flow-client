import { FC } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AddEventForm } from '@/components/forms/AddEventForm'

const AddEventSheet: FC = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button>Добавить мероприятие</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Новое мероприятие</SheetTitle>
          </SheetHeader>
          <AddEventForm />
        </SheetContent>
      </Sheet>
    </>
  )
}

export { AddEventSheet }
