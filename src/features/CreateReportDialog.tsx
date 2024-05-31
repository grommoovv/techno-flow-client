import { FC } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { CreateReportForm } from '@/components/forms/CreateReportForm'
// import cls from './CreateReportDialog.module.scss'

interface CreateReportDialogProps {
  equipment: {
    id: number
    title: string
  }
}

const CreateReportDialog: FC<CreateReportDialogProps> = ({ equipment }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='destructive'>
          Создать обращение
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-8'>
          <DialogTitle>Создать обращение</DialogTitle>
          <DialogDescription>
            Заполните поля. Нажмите кнопку создать, когда закончите.
          </DialogDescription>
        </DialogHeader>

        <CreateReportForm equipment={equipment} />
      </DialogContent>
    </Dialog>
  )
}

export { CreateReportDialog }
