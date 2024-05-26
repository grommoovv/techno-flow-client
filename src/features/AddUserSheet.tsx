import { FC } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AddUserForm } from '@/components/forms/AddUserForm'

const AddUserSheet: FC = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button>Добавить пользователя</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Новый пользователь</SheetTitle>
          </SheetHeader>
          <AddUserForm />
        </SheetContent>
      </Sheet>
    </>
  )
}

export { AddUserSheet }
