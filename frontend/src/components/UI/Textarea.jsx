import styles from './Textarea.module.css';

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 5,
  maxLength,
  ...props
}) => {
  return (
    <div className={styles.textareaGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        {...props}
      />
      <div className={styles.footer}>
        {error && <span className={styles.errorMessage}>{error}</span>}
        {maxLength && (
          <span className={styles.charCount}>
            {value?.length || 0} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
