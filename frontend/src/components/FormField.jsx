export function FormField({ label, name, hint, children }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {children}
      {hint && <p className="field-hint" id={`${name}-hint`}>{hint}</p>}
    </div>
  )
}

export function RoleSwitch({ value, onChange }) {
  return (
    <fieldset className="role-switch">
      <legend>Je suis</legend>
      <label className={value === 'student' ? 'selected' : ''}>
        <input
          type="radio"
          name="role"
          value="student"
          checked={value === 'student'}
          onChange={() => onChange('student')}
        />
        Étudiant
      </label>
      <label className={value === 'company' ? 'selected' : ''}>
        <input
          type="radio"
          name="role"
          value="company"
          checked={value === 'company'}
          onChange={() => onChange('company')}
        />
        Entreprise
      </label>
    </fieldset>
  )
}
