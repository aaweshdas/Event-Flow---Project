import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ meta, onPageChange }) => {
    if (meta.totalPages <= 1) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1}
                onClick={() => onPageChange(meta.page - 1)}
            >
                <ChevronLeft size={16} /> Previous
            </Button>

            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Page <strong style={{ color: 'var(--text-primary)' }}>{meta.page}</strong> of {meta.totalPages}
            </span>

            <Button
                variant="outline"
                size="sm"
                disabled={meta.page === meta.totalPages}
                onClick={() => onPageChange(meta.page + 1)}
            >
                Next <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export default Pagination;
