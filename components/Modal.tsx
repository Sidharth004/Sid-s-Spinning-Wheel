
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function Modal({ isOpen, onClose, title, content }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
          <DialogDescription className="mt-4 text-lg leading-relaxed text-gray-700">
            {content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}