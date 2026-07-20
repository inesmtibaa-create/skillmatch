import { getStudents } from '../api/students.js'
import { EmptyState, ErrorState, LoadingState } from '../components/Feedback.jsx'
import { PageHeader } from '../components/PageHeader.jsx'
import { StudentCard } from '../components/StudentCard.jsx'
import { useResource } from '../hooks/useResource.js'

export function StudentsPage() {
  const { status, data: students, error, reload } = useResource(getStudents, [])

  return (
    <>
      <PageHeader eyebrow="Talents" title="Les profils étudiants." description="Une vue simple des profils fournis par le backend." compact />
      <section className="page-section page-section-first">
        <div className="page-container">
          {status === 'loading' && <LoadingState label="Chargement des étudiants…" />}
          {status === 'error' && <ErrorState error={error} onRetry={reload} />}
          {status === 'success' && students.length === 0 && <EmptyState title="Aucun étudiant" description="Aucun profil étudiant n’est disponible." />}
          {status === 'success' && students.length > 0 && (
            <div className="card-grid card-grid-two">
              {students.map((student, index) => <StudentCard key={student.id ?? index} student={student} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
