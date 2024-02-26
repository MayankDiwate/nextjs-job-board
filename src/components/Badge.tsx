type BadgeProps = {
    children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
    return (
        <span
            className="
            border
            rounded
            px-2
            py-0.5
            bg-muted
            text-sm
            font-medium
            text-muted-foreground
            ">
            {children}
        </span>
    )
}