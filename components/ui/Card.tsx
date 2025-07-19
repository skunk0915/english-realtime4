import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className = '', 
    variant = 'default', 
    padding = 'md',
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-lg bg-white';
    
    const variantClasses = {
      default: 'shadow-sm',
      elevated: 'shadow-lg',
      bordered: 'border border-gray-200',
    };
    
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      className,
    ].filter(Boolean).join(' ');
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// サブコンポーネント
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', title, subtitle, children, ...props }, ref) => {
    const classes = ['mb-4', className].filter(Boolean).join(' ');
    
    return (
      <div ref={ref} className={classes} {...props}>
        {title && <h3 className='text-lg font-medium text-gray-800'>{title}</h3>}
        {subtitle && <p className='text-sm text-gray-600 mt-1'>{subtitle}</p>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

type CardContentProps = HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['text-gray-700', className].filter(Boolean).join(' ');
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

type CardFooterProps = HTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['mt-4 pt-4 border-t border-gray-200', className].filter(Boolean).join(' ');
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
export { CardHeader, CardContent, CardFooter };