import { FC, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useUpdateEquipment } from '@/api/equipment/queries'
import { EditEquipmentForm } from '@/components/forms/EditEquipmentForm'
// import cls from './EditEquipmentDialog.module.scss'

interface EditEquipmentDialogProps {}

const EditEquipmentDialog: FC = (props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm'>Изменить информацию</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='mb-8'>
            <DialogTitle>Изменить оборудование</DialogTitle>
            <DialogDescription>
              Внесите изменения в профиль оборудования. Нажмите кнопку сохранить, когда закончите.
            </DialogDescription>
          </DialogHeader>
          <EditEquipmentForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export { EditEquipmentDialog }
