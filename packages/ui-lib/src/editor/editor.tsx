import * as React from 'react'
import {
  ThemingProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { createField } from '@saas-ui/forms'
import { useEditor, EditorContent, EditorContentProps } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export interface EditorProps
  extends Omit<EditorContentProps, 'editor' | 'as' | 'ref' | 'size'>,
    ThemingProps<'Textarea'> {
  value?: string
  defaultValue?: string
}

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (props, ref) => {
    const { defaultValue, onChange, value, placeholder, ...rest } = props

    const styles = useMultiStyleConfig('Textarea', props)

    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder,
        }),
      ],
      content: defaultValue,
      onUpdate: ({ editor }) => {
        const html = editor?.getHTML()
        /* @ts-ignore */
        onChange?.(html || '')
      },
    })

    React.useEffect(() => {
      editor?.commands.setContent(value || '', false, {
        preserveWhitespace: 'full',
      })
    }, [editor, value])

    const editorStyles = {
      '& .ProseMirror': {
        outline: 0,
        width: '100%',
        minHeight: '80px',
      },
      '& .ProseMirror p.is-editor-empty:first-of-type::before': {
        color: 'muted',
        content: 'attr(data-placeholder)',
        float: 'left',
        height: 0,
        pointerEvents: 'none',
      },
      ...styles,
      height: 'auto',
    }

    return (
      <chakra.div
        ref={ref}
        as={EditorContent}
        editor={editor}
        {...rest}
        __css={editorStyles}
      />
    )
  },
)

export const EditorField = createField<EditorProps>(
  forwardRef((props, ref) => {
    const { name, ...rest } = props
    return <Editor ref={ref} {...rest} />
  }),
  { isControlled: true },
)
