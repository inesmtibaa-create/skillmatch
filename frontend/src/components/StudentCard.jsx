export function StudentCard({ student }) {
  return (
    <article className="content-card profile-card">
      <div className="avatar avatar-mint" aria-hidden="true">{student.name?.charAt(0).toUpperCase() || 'É'}</div>
      <div>
        <p className="card-kicker">{student.field || student.studyLevel || 'Profil étudiant'}</p>
        <h2>{student.name || 'Étudiant sans nom'}</h2>
        {student.description && <p className="card-description">{student.description}</p>}
        <div className="tag-list">
          {student.city && <span>{student.city}</span>}
          {student.availability != null && <span>{student.availability} mois disponibles</span>}
        </div>
        {student.skills.length > 0 && (
          <div className="skill-list" aria-label="Compétences">
            {student.skills.slice(0, 6).map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        )}
      </div>
    </article>
  )
}
